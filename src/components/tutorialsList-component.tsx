import { Component, ChangeEvent } from "react";
import TutorialDataService from "../services/tutorial-service";
import ITutorialData from '../types/tutorial-type';

type Props = {};

type State = {
  tutorials: Array<ITutorialData>,
  currentTutorial: ITutorialData | null,
  currentIndex: number,
};

export default class TutorialsList extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.retrieveTutorials = this.retrieveTutorials.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.removeAllTutorials = this.removeAllTutorials.bind(this);


        this.state = {
        tutorials: [],
        currentTutorial: null,
        currentIndex: -1,
        };
    }

    componentDidMount() {
        this.retrieveTutorials();
    }


    retrieveTutorials() {
        // TutorialDataService.getAll()
        // .then((response: any) => {
        //     this.setState({
        //     tutorials: response.data.data
        //     });
        //     console.log(response.data.data);
        // })
        // .catch((e: Error) => {
        //     console.log(e);
        // });
    }

    removeAllTutorials() {
        // TutorialDataService.deleteAll()
        //   .then((response: any) => {
        //     console.log(response.data);
        //     this.refreshList();
        //   })
        //   .catch((e: Error) => {
        //     console.log(e);
        //   });
      }

      refreshList() {
        // this.retrieveTutorials();
        // this.setState({
        //   currentTutorial: null,
        //   currentIndex: -1
        // });
      }
  

  render() {
    const {tutorials } = this.state;
        return (
            <div className="list row">
                <div className="col-md-8">
                </div>
                <div className="col-md-6">
                <h4>Tutorials List</h4>

                <ul className="list-group">
                {Array.isArray(tutorials) &&  tutorials.map((tutorial) => (
                    <li key={tutorial.id} className="list-group-item">
                    {tutorial.title}
                    </li>
                ))}
                    {/* {tutorials &&
                     tutorials.map((tutorial: ITutorialData, index: number) => (
                        <li
                        className={
                            "list-group-item"}>
                        {tutorial.title}
                        </li>
                    ))} */}
                </ul>
                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={this.removeAllTutorials}>
                    Remove All
                </button>
                </div>
            </div>
        )
    }
}