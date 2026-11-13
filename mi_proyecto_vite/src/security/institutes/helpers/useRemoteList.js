import { useCallback, useEffect, useState } from "react";
import { textoError } from "../services/remote/negociosApi";

// Carga una lista desde la API (api.list()) y permite volver a pedirla con reload()
export default function useRemoteList(api) {
  const [state, setState] = useState({ rows: [], loading: Boolean(api), error: "" });
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!api) return;
    let cancelado = false;
    api.list()
      .then((rows) => { if (!cancelado) setState({ rows, loading: false, error: "" }); })
      .catch((e) => { if (!cancelado) setState((s) => ({ ...s, loading: false, error: textoError(e) })); });
    return () => { cancelado = true; };
  }, [api, version]);

  const reload = useCallback(() => setVersion((v) => v + 1), []);

  return { ...state, reload };
}
