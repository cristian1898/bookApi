import { AUTHORINPUT, AUTHOROUTPUT } from "@interfaces/author";

export class AutorModel {
  author: AUTHORINPUT | undefined;
  response(author: AUTHORINPUT): AUTHOROUTPUT {
    return {
      id: author.id,
      biographyInformation: author.bio,
      email: author.email,
      firstName: author.first_Name,
      lastName: author.last_Name,
      name: author.name,
      img: author.img,
    };
  }

  create(author: AUTHOROUTPUT): AUTHORINPUT {
    this.author = {
      bio: author.biographyInformation,
      email: author.email,
      first_Name: author.firstName,
      last_Name: author.lastName,
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

