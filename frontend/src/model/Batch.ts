export default interface Batch {
  batchId?: string;
  batchName: string;
  semesterApplicable?: boolean;
  totalSemester: number;
  status?: string;
  createdDate?: string;
  createdBy?: string;
  updatedDate?: string;
  updatedBy?: string;
}
