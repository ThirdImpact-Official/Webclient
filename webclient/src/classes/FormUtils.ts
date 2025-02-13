export class FormUtils<T extends Record<string, unknown>> {
  /**
   * Handles form submission by preventing default event behavior and calling the provided onSubmit function.
   *
   * @param {React.FormEvent} event - Form event object.
   * @param {Function} onSubmit - Function to call when the form is submitted.
   */


  public async handleSubmit(
    e: React.FormEvent,
    onSubmit?: () => Promise<void>): Promise<void>{
    e.preventDefault();
    if (onSubmit) {
      await onSubmit();
    }
  }

  /**
   * Handles change events for form fields by updating the corresponding state property.
   *
   * @param {keyof T} key - Property key to update in state.
   * @param {string} value - New value for the property.
   */
  public handleOnChange = <K extends keyof T>(key: K, value: T[K],setData: React.Dispatch<React.SetStateAction<T>> ): void =>
  {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }))
  };

  /**
   * Formats a date as a string in the format "MM/dd/yyyy".
   *
   * @param {Date} dateToFormat - Date to format.
   * @returns {string} Formatted date string.
   */
  public FormatString(dateToFormat: Date): string {
    if (!dateToFormat) {
      throw new Error("Date not found");
    }

    return dateToFormat.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
}
