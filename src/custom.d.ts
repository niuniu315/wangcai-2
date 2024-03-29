type RecordType = {
  tags: Tag[]
  notes: string
  type: string
  amount: number
  createdTime?: string // ?问号表示你管我有没有这个类型
  createdAt: string
}

type RootState = {
  recordList: RecordType[],
  createRecordError: Error | null,
  createTagError: Error | null,
  tagList: Tag[],
  currentTag?: Tag
}

type Tag = {
  id: string;
  name: string;
}

// type TagListModel = {
//   data: Tag[]
//   fetch: () => Tag[]
//   create: (name: string) => 'success' | 'duplicated' //创建两个联合类型 成功和重复
//   update: (id: string, name: string) => 'success' | 'notfound' | 'duplicated'
//   remove: (id: string) => boolean
//   save: () => void
// }
//
// interface Window {
//
//
// }
