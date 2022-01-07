export interface INote {
  readonly title: string;
  readonly body: string;
}

export const noteUtils = {
  updateTitle,
  updateBody
}

function updateTitle(note: INote, newTitle: string): INote {
  return {
    ...note,
    title: newTitle
  };
}

function updateBody(note: INote, newBody: string): INote {
  return {
    ...note,
    body: newBody
  }
}
