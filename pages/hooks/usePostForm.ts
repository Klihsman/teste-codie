import { useCallback, useMemo } from "react";
import ScheduleFormService from "../services/scheduleFormService";

const usePostForm = () => {
  const scheduleFormService = useMemo(() => new ScheduleFormService(), []);

  const postForm = useCallback(() => {
    // if you want simule some error, just change the param of fakePostRequest to false
    return scheduleFormService.fakePostRequest(true).then((data) => {
      return Promise.resolve(data);
    });
  }, [scheduleFormService]);

  return postForm;
};

export default usePostForm;
