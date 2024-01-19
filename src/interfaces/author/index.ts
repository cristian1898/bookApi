interface AUTORBASE {
  name: string;
  email: string;
  img: string;
  id?: string;
}

export interface AUTHORINPUT extends AUTORBASE {
  first_name: string;
  last_name: string;
  biography_information: string;
}

export interface AUTHOROUTPUT extends AUTORBASE {
  biographyInformation: string;
  firstName: string;
  lastName: string;
}
