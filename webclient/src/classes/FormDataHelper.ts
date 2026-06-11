export class FormDataHelper {
  static toFormData(
    data: Record<string, any>,
    form?: FormData,
    namespace = ''
  ): FormData {
    const formData = form || new FormData();

    for (const propertyName in data) {
      if (!data.hasOwnProperty(propertyName) || data[propertyName] === undefined || data[propertyName] === null) {
        continue;
      }

      const formKey = namespace ? `${namespace}[${propertyName}]` : propertyName;
      const value = data[propertyName];

      if (
        value instanceof Date ||
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'
      ) {
        formData.append(formKey, value.toString());
      } else if (value instanceof File || value instanceof Blob) {
        formData.append(formKey, value);
      } else if (Array.isArray(value)) {
        value.forEach((element, index) => {
          FormDataHelper.toFormData({ [index]: element }, formData, formKey);
        });
      } else if (typeof value === 'object') {
        FormDataHelper.toFormData(value, formData, formKey);
      } else {
        formData.append(formKey, value.toString());
      }
    }

    return formData;
  }
}