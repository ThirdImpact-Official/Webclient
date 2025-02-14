import { Box, Button } from "@mui/material";
import {  useState } from "react";
//TODO
// ce composant servira a creer des formulaire généric au sein de l'application
// étapes 1 creer une formulaire générique 
// etapes 2 ajouter des champs dynamiquement sur base de spropriéter 
// étapes 3 ajouter des actions sur base de spropriéter 
// etapes 4 ajouter des validations sur base de spropriéter
//étapes  5 intégrer le cde du formulaire dans le composant parent
//

// Typage des données du formulaire
type FormPropsField<T> = {
    fieldKey: keyof T;
    label: string;
    type: string;
};

interface FormProps<T> {
    data: T;
    onSubmit: (data: T) => void;
    onChange: (key: keyof T, value: string) => void;
}

// Composant de champ générique
function GenericFormField<T>({
    fieldKey,
    label,
    type,
    value,
    onChange: handleFieldValueChange,
}: {
    fieldKey: keyof T;
    label: string;
    type: string;
    value: T[keyof T];
    onChange: (key: keyof T, value: string) => void;
}) {
    return (
        <div className="form-group mx-9 px-10">
            <label  htmlFor={`${fieldKey.toString()}`}>{label}</label>
            <input
                className="form-control mx-4 p-2"
                type={type}
                id={`${fieldKey.toString()}`}
                value={value.toString()}
                onChange={(e) => handleFieldValueChange(fieldKey, e.target.value)}
            />
        </div>
    );
}

// Composant de formulaire générique
export function GenericForm<T>({ data, onSubmit: handleSubmit }: FormProps<T>) {
    const [formData, setFormData] = useState<T>(data);

    // Gestion des changements dans les champs
    const handleChange = (key: keyof T, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(formData);
            }}
            >
                {Object.entries(data).map(([key, value]) => {
                    const label = key.charAt(0).toUpperCase() + key.slice(1);
                    const type = typeof value === "string" ? "text" : typeof value === "number" ? "number" : "text";

                    return (
                        <GenericFormField
                            key={key}
                            fieldKey={key as keyof T}
                            label={label}
                            type={type}
                            value={formData[key as keyof T]}
                            onChange={handleChange}
                        />
                    );
                })}
                <Button variant="contained" type="submit">
                    Submit
                </Button>
            </form>
        </Box>
    );
}
export default GenericForm;

