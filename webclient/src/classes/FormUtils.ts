import { GetDifficultyLevelDto } from "@/interfaces/EscapeGameInterface/DifficultyLevel/getDifficultyLevelDto";
import { GetPriceDto } from "@/interfaces/EscapeGameInterface/Price/getPriceDto";

 class FormUtils<T extends Record<string, unknown>> {
  /**
   * Handles form submission by preventing default event behavior and calling the provided onSubmit function.
   *
   * @param {React.FormEvent} event - Form event object.
   * @param {Function} onSubmit - Function to call when the form is submitted.
   */
  public async handleSubmit(
    e: React.FormEvent,
    onSubmit?: () => Promise<void>
  ): Promise<void> {
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
  public handleOnChange = <K extends keyof T>(
    key: K,
    value: T[K],
    setData: React.Dispatch<React.SetStateAction<T>>
  ): void => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  /**
   * Formats a date as a string in the format "MM/dd/yyyy".
   *
   * @param {Date} dateToFormat - Date to format.
   * @returns {string} Formatted date string.
   */
  public formatString(dateToFormat: Date): string {
    if (!dateToFormat) {
      throw new Error("Date not found");
    }

    return dateToFormat.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  public formatDateString(value: string)
  {
      if (!isNaN(Date.parse(value))) {
        const date = new Date(value);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }); // Format MM/DD/YYYY
    }
    return value;
  }

  public static isGetDifficultyLevelDto(
    value: unknown
  ): value is GetDifficultyLevelDto {
    return (
      value !== null &&
      typeof value === "object" &&
      "dowId" in value &&
      typeof value.dowId === "number" &&
      "dowName" in value &&
      typeof value.dowName === "string"
    );
  }

  public static isGetPriceDto(value: unknown): value is GetPriceDto {
    return (
      value !== null &&
      typeof value === "object" &&
      "id" in value &&
      typeof value.id === "number" &&
      "indicePrice" in value &&
      typeof value.indicePrice === "number"
    );
  }
}

export default FormUtils;