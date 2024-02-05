import { useCallback, useMemo } from "react";
import ScheduleFormService from "../services/scheduleFormService";

const useGetRegions = () => {
  const scheduleFormService = useMemo(() => new ScheduleFormService(), []);

  const getRegions = useCallback(() => {
    return scheduleFormService.getRegions().then((regions) => {
      return Promise.resolve(regions);
    });
  }, [scheduleFormService]);

  return getRegions;
};

export default useGetRegions;
