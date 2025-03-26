import CustomError from "../../../shared/CustomErrorClass";
import axios from "axios";

export default async function handleError(err, setError) {
  console.error(err.stack);

  let errorMessage;
  if (err instanceof CustomError && err.isOperational) {
    errorMessage = err.message || getErrorMessageByCode(err.statusCode);
    setError(errorMessage);
  } else if (axios.isAxiosError(err)) {
    if (err.response) {
      err.message = null;
      errorMessage = getErrorMessageByCode(err.response.status);
    } else if (err.request) {
      errorMessage = "Provjerite imate li interneta.";
    } else {
      errorMessage = err.message;
    }
    setError(errorMessage);
  } else {
    console.error("Unexpected error:", err);
    setError("Došlo je do neočekivane pogreške!");
  }
}

function getErrorMessageByCode(code) {
  switch (code) {
    case 400:
      return "Uneseni podaci su netočni.";
    case 401:
      return "Vaši su podaci netočno unešeni. Molimo pokušajte ponovno.";
    case 403:
      return "Nemate pristup ovoj stranici.";
    case 404:
      return "Nisu pronađeni traženi podaci.";
    case 409:
      return "Ovi podaci već postoje. Molimo pokušajte ponovno.";
    default:
      return "Došlo je do pogreške. Molimo pokušajte ponovno kasnije.";
  }
}
