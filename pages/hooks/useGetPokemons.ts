import { useCallback, useMemo } from "react";
import ScheduleFormService from "../services/scheduleFormService";
import { IPokemon } from "../types";

const useGetPokemons = () => {
  const scheduleFormService = useMemo(() => new ScheduleFormService(), []);

  const getPokemons = useCallback((): Promise<IPokemon[]> => {
    return scheduleFormService.getPokemons().then((pokemons) => {
      return Promise.resolve(pokemons);
    });
  }, [scheduleFormService]);

  return getPokemons;
};

export default useGetPokemons;
