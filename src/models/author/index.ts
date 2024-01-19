import { AUTHORINPUT, AUTHOROUTPUT } from "@interfaces/author";

export class AutorModel {
  author: AUTHORINPUT | undefined;
  response(author: AUTHORINPUT): AUTHOROUTPUT {
    return {
      id: author.id,
      biographyInformation: author.biography_information,
      email: author.email,
      firstName: author.first_name,
      lastName: author.last_name,
      name: author.name,
      img: author.img,
    };
  }

  create(author: AUTHOROUTPUT): AUTHORINPUT {
    this.author = {
      biography_information: author.biographyInformation,
      email: author.email,
      first_name: author.firstName,
      last_name: author.lastName,
      name: author.name,
      img: author.img,
    };
    return this.author;
  }
}

// const autorExample = new Autor(
//   'Biografía del autor',
//   'correo@example.com',
//   'Nombre',
//   'Apellido',
//   'Nombre Completo',
//   'url_de_la_imagen'
// );
