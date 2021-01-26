interface ITemplateVariables {
  [key: string]: string | number | Date;
}

export default interface IParseMailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}
