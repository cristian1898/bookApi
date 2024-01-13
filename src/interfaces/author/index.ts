interface AUTORBASE {
  name: string;
  email: string;
  img: string;
  id?: string;
}

export interface AUTHORINPUT extends AUTORBASE {
  first_Name: string;
  last_Name: string;
  bio: string;
}

export interface AUTHOROUTPUT extends AUTORBASE {
  biographyInformation: string;
  firstName: string;
  lastName: string;
}
