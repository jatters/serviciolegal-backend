import type { Schema, Struct } from '@strapi/strapi';

export interface LegalAccionista extends Struct.ComponentSchema {
  collectionName: 'components_legal_accionistas';
  info: {
    displayName: 'Accionista';
  };
  attributes: {
    country: Schema.Attribute.String;
    document: Schema.Attribute.String;
    documentType: Schema.Attribute.Enumeration<
      ['CC', 'CE', 'NIT', 'Pasaporte']
    >;
    name: Schema.Attribute.String;
    nationality: Schema.Attribute.String;
    numberOfShares: Schema.Attribute.Integer;
  };
}

export interface LegalPersona extends Struct.ComponentSchema {
  collectionName: 'components_legal_personas';
  info: {
    displayName: 'Persona';
    icon: 'user';
  };
  attributes: {
    countryResidence: Schema.Attribute.String;
    document: Schema.Attribute.String;
    documentType: Schema.Attribute.Enumeration<
      ['CC', 'CE', 'NIT', 'Pasaporte']
    >;
    name: Schema.Attribute.String;
    nationality: Schema.Attribute.String;
  };
}

export interface PreguntasFrecuentesPreguntasFrecuentes
  extends Struct.ComponentSchema {
  collectionName: 'components_preguntas_frecuentes_preguntas_frecuentes';
  info: {
    displayName: 'Preguntas Frecuentes';
  };
  attributes: {
    answer: Schema.Attribute.Text;
    question: Schema.Attribute.String;
  };
}

export interface SharedCaracteristicaServicio extends Struct.ComponentSchema {
  collectionName: 'components_shared_caracteristica_servicios';
  info: {
    description: '';
    displayName: 'Caracteristica Servicio';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface SharedInformacionAdicional extends Struct.ComponentSchema {
  collectionName: 'components_shared_informacion_adicionals';
  info: {
    displayName: 'Informaci\u00F3n adicional';
  };
  attributes: {
    informacionAdicional: Schema.Attribute.Blocks;
  };
}

export interface SharedMetaSocial extends Struct.ComponentSchema {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    description: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    socialNetwork: Schema.Attribute.Enumeration<['Facebook', 'Twitter']> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaImage: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    metaRobots: Schema.Attribute.String;
    metaSocial: Schema.Attribute.Component<'shared.meta-social', true>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    structuredData: Schema.Attribute.JSON;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'legal.accionista': LegalAccionista;
      'legal.persona': LegalPersona;
      'preguntas-frecuentes.preguntas-frecuentes': PreguntasFrecuentesPreguntasFrecuentes;
      'shared.caracteristica-servicio': SharedCaracteristicaServicio;
      'shared.informacion-adicional': SharedInformacionAdicional;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
    }
  }
}
