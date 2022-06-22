type RecordType = {
  tags: string[]
  notes: string
  type: string
  amount: number
  createdTime?: Date // ?问号表示你管我有没有这个类型
}
type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  create: (name: string) => 'success' | 'duplicated' //创建两个联合类型 成功和重复
  update: (id: string, name: string) => 'success' | 'notfound' | 'duplicated'
  remove: (id: string) => boolean
  save: () => void
}

interface Window {
  tagList: Tag[];
  createTag: (name: string) => void;
  findTag: (id: string) => Tag | undefined;
  removeTag: (id: string) => boolean;
  updateTag: (id: string, name: string) => 'success' | 'notfound' | 'duplicated'
  recordList: RecordType[];
  createRecord: (record: RecordType) => void;
}