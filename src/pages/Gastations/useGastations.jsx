import { useSelector, useDispatch } from "react-redux";
import { useMemo, useCallback } from "react";
import {
  getProvincias,
  getMunicipios,
  getGastations,
  getGastationDetails,
} from "../../redux/oilApi/oilSlice";

export const useGastations = () => {
  const dispatch = useDispatch();

  const {
    provincias,
    municipios,
    gastations,
    gastationDetails,
    isLoading,
    isError,
    message,
  } = useSelector((state) => state.oil);


  const loadProvincias = useCallback(() => {
    dispatch(getProvincias());
  }, []);


  const selectProvincia = useCallback((idProvincia) => {
    if (idProvincia) dispatch(getMunicipios(idProvincia));
  }, []);

  const selectMunicipio = useCallback((idMunicipio) => {
    if (idMunicipio) dispatch(getGastations(idMunicipio));
  }, []);

  const selectGastation = useCallback((idEstacion) => {
    if (idEstacion) dispatch(getGastationDetails(idEstacion));
  }, []);

  
  const provinciasFiltradas = useMemo(() => {
    return provincias.filter((p) => p.idProvincia < 53);
  }, [provincias]);

  return {
    provincias: provinciasFiltradas,
    municipios,
    gastations,
    gastationDetails,
    isLoading,
    isError,
    message,
    loadProvincias,
    selectProvincia,
    selectMunicipio,
    selectGastation,
  };
};