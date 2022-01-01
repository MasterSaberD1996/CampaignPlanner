import isEmpty from "lodash-es/isEmpty";
import {Accessor, Constructor} from "./typings";

interface IMemberData<T> {
	readonly methodNames: readonly (keyof T)[];
	readonly definedPropertiesData: readonly IDefinedPropertyData<T>[];
}

interface IDefinedPropertyData<T> {
	readonly propertyName: keyof T;
	readonly hasGet: boolean;
	readonly hasSet: boolean;
}

export class AutoMocker {
	private readonly keyNameExclusions: string[] = [
		"window",
		"$window",
		"$q",
		"$rootScope",
		"$location"
	];

	constructor(private readonly maxDepth: number = 1) {
	}

	public mockClass<T>(constructor: Constructor<T>): T {
		const memberData = this.getMemberData(constructor);
		const mock = isEmpty(memberData.methodNames)
			? {} as T
			: jasmine.createSpyObj(constructor.prototype.constructor.name,
				memberData.methodNames as jasmine.SpyObjMethodNames);

		memberData.definedPropertiesData.forEach(propertyData => {
			this.addMockDefinedProperty<T>(mock, propertyData);
		});

		return mock;
	}

	public mock<T extends {}>(objectName: string, objectToMock: T, maxDepth?: number): void {
		if (!!objectToMock && (this.isObject(objectToMock || this.isFunction(objectToMock)))) {
			this.mockObject(objectName, objectToMock, 0, maxDepth || this.maxDepth);
		}
	}

	public withCallFake<TFunction extends (...args: any) => any>(spy: TFunction, fakeFunction: (...params: Parameters<TFunction>) => ReturnType<TFunction>, spyName?: string): void {
		if (this.isSpyLike(spy)) {
			spy.and.callFake(fakeFunction);
			return;
		}
		this.throwNotASpyError("withCallFake", spyName);
	}

	public withCallThrough(spy: Function, spyName?: string): void {
		if (this.isSpyLike(spy)) {
			spy.and.callThrough();
			return;
		}
		this.throwNotASpyError("withCallThrough", spyName);
	}

	public withReturnValue<T>(spy: (...args: any[]) => T, returnValue: T, spyName?: string): void {
		if (this.isSpyLike(spy)) {
			spy.and.returnValue(returnValue);
			return;
		}
		this.throwNotASpyError("withReturnValue", spyName);
	}

	public withReturnValues<T>(spy: (...args: any[]) => T, returnValues: T[], spyName?: string): void {
		if (this.isSpyLike(spy)) {
			spy.and.returnValues(...returnValues);
			return;
		}
		this.throwNotASpyError("withReturnValues", spyName)
	}

	public withThrows(spy: Function, message?: string, spyName?: string): void {
		if (this.isSpyLike(spy)) {
      // @ts-ignore
      spy.and.throwError(message);
			return;
		}
		this.throwNotASpyError("withThrows", spyName);
	}

	public resetSpy(spy: Function, spyName?: string): void {
		if (this.isSpyLike(spy)) {
			spy.calls.reset();
			return;
		}
		this.throwNotASpyError("resetSpy", spyName);
	}

	public withCallAccessorFake<TFunction extends (...args: any[]) => any>(obj: TFunction, key: keyof TFunction, accessor: Accessor, fakeFunction: TFunction, spyName?: string): void {
		this.withCallFake(this.getPropertyAccessorSpy(obj, key, accessor), fakeFunction, spyName);
	}

	public withCallAccessorThrough<T>(obj: T, key: keyof T, accessor: Accessor, spyName?: string): void {
		this.withCallThrough(this.getPropertyAccessorSpy(obj, key, accessor), spyName);
	}

	public withReturnGetterValue<T, K extends keyof T>(obj: T, key: K, returnValue: T[K], spyName?: string): void {
		this.withReturnValue(this.getPropertyAccessorSpy(obj, key), returnValue, spyName);
	}

	public withReturnGetterValues<T, K extends keyof T>(obj: T, key: K, returnValues: T[K][], spyName?: string): void {
		this.withReturnValue(this.getPropertyAccessorSpy(obj, key), returnValues, spyName);
	}

	public withAccessorThrows<T>(obj: T, key: keyof T, accessor?: Accessor, message?: string, spyName?: string): void {
		this.withThrows(this.getPropertyAccessorSpy(obj, key, accessor), message, spyName);
	}

	public resetAccessorSpy<T>(obj: T, key: keyof T, accessor?: Accessor, spyName?: string): void {
		this.resetSpy(this.getPropertyAccessorSpy(obj, key, accessor), spyName);
	}

	public getCallArgs<TFunction extends (...args: any) => any>(spy: TFunction, callIndex: number = 0, spyName?: string): Parameters<TFunction> {
		if (this.isSpyLike(spy)) {
			return spy.calls.argsFor(callIndex) as Parameters<TFunction>
		}
		return this.throwNotASpyError("getCallArgs", spyName);
	}

	private getMemberData<T>(constructor: Constructor<T>): IMemberData<T> {
		const methodNames: (keyof T)[] = [];
		const definedPropertiesData: IDefinedPropertyData<T>[] = [];

		let currentPrototype: any = constructor.prototype;
		do {
			if (currentPrototype.constructor.name === "Object") {
				break;
			}
			(Object.getOwnPropertyNames(currentPrototype) as (keyof T)[])
				.forEach(memberName => {
					if (memberName === "constructor") {
						return;
					}

					const propertyData = this.getDefinedPropertyData(currentPrototype, memberName);
					if (propertyData && (propertyData.hasGet || propertyData.hasSet)) {
						definedPropertiesData.push(propertyData);
						return;
					}

					if (this.isFunction(currentPrototype[memberName])) {
						methodNames.push(memberName);
						return;
					}
				});
		} while (currentPrototype = Object.getPrototypeOf(currentPrototype));

		return {
			methodNames,
			definedPropertiesData
		};
	}

	private getDefinedPropertyData<T>(obj: T, propertyName: keyof T): IDefinedPropertyData<T> {
		try {
			const descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
      return {
				propertyName,
			// @ts-ignore
				hasGet: descriptor && this.isFunction(descriptor.get),
			// @ts-ignore
				hasSet: descriptor && this.isFunction(descriptor.set)
			};
		} catch {
			// @ts-ignore
      return null;
		}
	}

	private addMockDefinedProperty<T>(mock: T, propertyData: IDefinedPropertyData<T>): void {
		const attributes = {
			get: propertyData.hasGet ? () => {} : undefined,
			set: propertyData.hasSet ? () => {} : undefined,
			configurable: true
		};
		Object.defineProperty(mock, propertyData.propertyName, attributes);
		this.mockAsProperty(mock, propertyData.propertyName);
	}

	private mockObject<T extends {}>(objectName: string, objectToMock: T, depth: number, maxDepth: number): void {
		if (objectToMock.constructor === HTMLDocument) {
			return;
		}

		const objectKeys = this.getInstancePropertyNames(objectToMock);

		// @ts-ignore
    objectKeys.forEach((key: keyof T & string) => {
			try {
				if (!this.mockAsProperty(objectToMock, key)) {
					objectToMock[key] = this.mockValue(objectName, objectToMock, key, depth++, maxDepth);
				}
			} catch (exception) {
				console.error(`Unable to mock ${objectName}.${key} with preexisting value of "${objectToMock[key]}."`, exception)
			}
		});
	}

	private getInstancePropertyNames<T>(objectToMock: T): string[] {
		let names: Set<string> = new Set();
		let proto = objectToMock;
		while (proto && proto !== Object.prototype) {
			Object.getOwnPropertyNames(proto)
				.forEach(name => {
					if (name !== 'constructor') {
						names.add(name);
					}
				});
			proto = Object.getPrototypeOf(proto);
		}
		return Array.from(names);
	}

	private mockAsProperty<T extends {}>(objectToMock: T, key: keyof T): boolean {
		let descriptor: PropertyDescriptor;
		do {
			// @ts-ignore
      descriptor = Object.getOwnPropertyDescriptor(objectToMock, key);
		} while (!descriptor && (objectToMock = Object.getPrototypeOf(objectToMock)));

		if (descriptor && (descriptor.get || descriptor.set)) {
			if (descriptor.get && !this.isSpyLike(descriptor.get)) {
				spyOnProperty(objectToMock, key, 'get').and.callThrough();
			}
			if (descriptor.set && !this.isSpyLike(descriptor.set)) {
				spyOnProperty(objectToMock, key, 'set');
			}
			return true;
		}
		return false;
	}

	private mockValue<T>(objectName: string, objectToMock: T, key: keyof T, depth: number, maxDepth: number): any {
		const value = objectToMock[key];

		if (this.isUndefined(value) || value === null || this.isExcluded(key.toString())) {
			return value;
		}
		if (Array.isArray(value)) {
			return depth < maxDepth ? value.map((item, i) => this.mockValue(`${objectName}[${i}]`, value, i as any, depth++, maxDepth)) : value;
		}
		if (this.isFunction(value)) {
			return this.isSpyLike(value) ? value :
				spyOn(objectToMock, key as T[keyof T] extends Function ? keyof T: never);
		}
		if (this.isObject(value)) {
			return depth < maxDepth ? this.mockObject(`${objectName}.${key}`, value, depth++, maxDepth) : value;
		}
		if (this.isString(value)) {
			return `${objectName}.${key}` + this.generateNumber().toString();
		}
		if (this.isDate(value)) {
			return new Date(2000, 1, 1, 1, 1, 1, 1);
		}
		if (this.isNumber(value)) {
			return this.generateNumber();
		}
		return value;
	}

	private getPropertyAccessorSpy<T>(objectToMock: T, key: keyof T, accessor: Accessor = 'get'): jasmine.Spy {
		let descriptor: PropertyDescriptor;
		do {
			// @ts-ignore
      descriptor = Object.getOwnPropertyDescriptor(objectToMock, key);
		} while (!descriptor && (objectToMock = Object.getPrototypeOf(objectToMock)));

		if (!descriptor) {
			// @ts-ignore
      return null;
		}

		return descriptor[accessor] as jasmine.Spy;
	}

	protected throwNotASpyError(methodName: string, spyName: string = "[spyName not provided]"): never {
		throw new Error(`${methodName}: provided spy "${spyName}" is not an actual spy.`);
	}

	private generateNumber(): number {
		return Math.floor(Math.random() * 1000000)
	}

	private isFunction(value: any): value is Function {
		return typeof value === 'function';
	}

	private isObject(value: any): value is Object {
		return value !== null && typeof value === 'object';
	}

	private isDate(value: any): value is Date {
		return toString.call(value) === '[object Date]'
	}

	private isNumber(value: any): value is number {
		return typeof value === 'number'
	}

	private isString(value: any): value is string {
		return typeof value === 'string';
	}

	private isUndefined(value: any): boolean {
		return typeof value === 'undefined';
	}

	protected isSpyLike(value: any): value is jasmine.Spy {
		return value && !!value.calls;
	}

	private isExcluded(key: string): boolean {
		return this.keyNameExclusions.some(keyName => key === keyName);
	}
}
