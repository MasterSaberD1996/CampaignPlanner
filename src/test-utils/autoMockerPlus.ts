import { HttpErrorResponse } from "@angular/common/http";
import { AutoMocker } from "./autoMocker";
import { Observable, of, ReplaySubject, Subject} from 'rxjs';

type ObservablePropertyNames<T> = {
	[K in keyof T]: T[K] extends Observable<any> ? K : never;
}[keyof T];

type ObservableType<T> = T extends Observable<infer U> ? U : T;

export class AutoMockerPlus extends AutoMocker {
	public withReturnObservable<T>(
		spy: (...args: any[]) => Observable<T>,
		resolveWith?: T,
		spyName?: string
	): Observable<T | undefined> {
		if (this.isSpyLike(spy)) {
			let observable: Observable<T | undefined> = of(resolveWith);
			spy.and.returnValue(observable);
			return observable;
		}
		return this.throwNotASpyError("withReturnObservable", spyName)
	}
	public withReturnObservables<T>(
		spy: (...args: any[]) => Observable<T>,
		resolveWith?: T[],
		spyName?: string
	): Observable<T>[] {
		if (this.isSpyLike(spy)) {
			const observables: Observable<T>[] = resolveWith?.map((r) => {
				if (r instanceof Observable) {
					return r;
				}
				return of(r);
			}) ?? (Array.of(Observable) as unknown as Observable<T>[]);
			spy.and.returnValues(observables);
			return observables;
		}
		return this.throwNotASpyError("withReturnObservables", spyName);
	}

	public withReturnSubjectForObservableProperty<
		T,
		K extends ObservablePropertyNames<T>,
		U extends ObservableType<T[K]>
		>(
			objectToMock: T,
			observablePropertyName: K,
			initialValue?: U,
			replayBuffer: number = 1
	): ReplaySubject<U> {
		const subject = new ReplaySubject<U>(replayBuffer);
		(objectToMock[observablePropertyName] as any) = subject.asObservable();
		if (initialValue !== undefined) {
			subject.next(initialValue)
		}
		return subject;
	}

	public withReturnSubjectAsObservable<T>(
		spy: (...args: any[]) => Observable<T>,
		resolveWith?: T,
		spyName?: string
	): Subject<T> {
		if (this.isSpyLike(spy)) {
			const subject: Subject<T> = new Subject<T>();
			if (resolveWith !== undefined) {
				subject.next(resolveWith);
			}
			const observable: Observable<T> = subject.asObservable();
			spy.and.returnValue(observable);
			return subject;
		}
		this.throwNotASpyError("withReturnSubjectAsObservable", spyName)
	}

	public withReturnSubjectWithErrorAsObservable<T>(
		spy: (...args: any[]) => Observable<T>,
		resolveWithError?: any,
		spyName?: string,
	): Subject<T> {
		if (this.isSpyLike(spy)) {
			let subject: Subject<T> = new Subject<T>();
			if (resolveWithError) {
				subject.error(resolveWithError);
			} else {
				subject.error(new Error("error"));
			}
			let observable: Observable<T> = subject.asObservable();
			spy.and.returnValue(observable);
			return subject;
		}
		return this.throwNotASpyError("withReturnSubjectWithErrorAsObservable", spyName);
	}

	public withReturnSubjectWithHttpErrorAsObservable<T>(
		spy: (...args: any[]) => Observable<T>,
		resolveWithHttpError?: HttpErrorResponse,
		spyName?: string,
	): Subject<T> {
		if (this.isSpyLike(spy)) {
			let subject: Subject<T> = new Subject<T>();
			if (resolveWithHttpError) {
				subject.error(resolveWithHttpError);
			} else {
				subject.error(new HttpErrorResponse({}));
			}
			let observable: Observable<T> = subject.asObservable();
			spy.and.returnValue(observable);
			return subject;
		}
		return this.throwNotASpyError("withReturnSubjectWithErrorAsObservable", spyName);
	}

	public suppressConsoleLogs(): void {
		spyOn(console, "trace");
		spyOn(console, "debug");
		spyOn(console, "info");
		spyOn(console, "log");
		spyOn(console, "warn");
		spyOn(console, "error");
	}
}

export const autoMockerInstance = new AutoMockerPlus();
