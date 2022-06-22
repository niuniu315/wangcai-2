import recordListModel from "@/models/recordListModel";

export default {
  recordList: recordListModel.fetch(),
  createRecord: (record: RecordType) => recordListModel.create(record)
}