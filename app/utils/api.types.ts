type ChildInfo = {
  name: string;
  idCode?: string;
  sex?: string;
  dob?: Date;
  addendum?: string;
};

type CampInfo = {
  shiftNr: number;
  isNew: boolean;
  shirtSize: string;
};

type AddressInfo = {
  road: string;
  city: string;
  county: string;
  country: string;
};

type ParentInfo = {
  contactName: string;
  contactEmail: string;
  contactNumber: string;
  backupTel?: string;
};

type EmailStatus = {
  sendEmail?: boolean;
};

export type RegistrationAPIRequest = ChildInfo &
  CampInfo &
  AddressInfo &
  ParentInfo &
  EmailStatus;

type JSendData = {
  [key: string]: any;
} | null;

type JSendSuccess = {
  status: "success";
  data: JSendData;
};

type JSendFail = {
  status: "fail";
  data: JSendData;
};

interface JSendErrorData {
  message: string;
  code?: number;
  data?: JSendData;
}

interface JSendError extends JSendErrorData {
  status: "error";
}

export type JSendResponse = JSendSuccess | JSendFail | JSendError;
