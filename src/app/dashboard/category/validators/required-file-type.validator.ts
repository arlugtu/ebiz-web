import { FormControl } from "@angular/forms";

export function requiredFileType(types: string[]) {
    return function (control: FormControl) {
        const file = control.value;
        if (file) {
            const extension = file.split('.')[1].toLowerCase();
            if (types.includes(extension.toLowerCase())) {
                return {
                    requiredFileType: true
                };
            }
            return null;
        }
        return null;
    };
}