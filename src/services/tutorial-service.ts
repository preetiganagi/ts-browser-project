import http from "../http-common";
import ITutorialData from "../types/tutorial-type"

class TutorialDataService {
    getAll(){
        return http.get<Array<ITutorialData>>("/tutorials");
    }
    create(data: ITutorialData) {
        return http.post<ITutorialData>("/addTutorial", data);
    }
    get(id: string) {
        return http.get<ITutorialData>(`/tutorials/${id}`);
    }
    deleteAll() {
        return http.delete<any>(`/tutorials`);
      }
  
}

export default new TutorialDataService();
