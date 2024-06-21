export interface Report {
    academicYear: number|string;
    myanmar: number|string;
    english: number|string;
    mathematic: number|string;
    history: number|string;
    science: number|string;
    total: number|string;
  }
  
export interface Student {
    id:number|string;
    studentID: string;
    name: string;
    nrc: string;
    dob: string;
    email: string;
    address: string;
    gender: string;
    state: string;
    phonenumber: number|string;
    hobby: string[];
    reports: Report[];
  }
  
