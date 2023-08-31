import React ,{useState,useEffect} from 'react'
import Confidential from '../Confidential';

import Loader from '../../loader';
import { Link } from 'react-router-dom';
const Papers = () => {
  const [ass, setAss] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getAssignments() {
    const res = await fetch("http://localhost:5000/api/r2/assignments");

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch assignments data");
    }

    const data = await res.json();
    setAss(data);
    setLoading(false);
  }

  useEffect(() => {
    getAssignments();
  }, []);
  if (loading)
    return (
      <Confidential>
      <Loader/>
      </Confidential>
    );

  return (
    <Confidential>
      <h1 className="text-center text-3xl font-bold">Assignments status</h1>
      <p>Just correct api calls when api is ready.right now using Examiner api list </p>

      {ass.map((assignment, index) => (
        <Link key={index} to={`/confidential/Papers/${assignment._id}`}>
          <div className="px-6 py-3 text-2xl items-center flex justify-between my-3 rounded-xl bg-white">
            <p className="  font-bold">{index}</p>
            <h1 className="  ">{assignment?.Subject?.Name}</h1>
            <h1 className="  ">{assignment?.Subject?.SubjectCode}</h1>

            <h1 className="  ">
              {new Date(assignment?.DOE).toLocaleDateString()}
            </h1>
            <h1 className=" font-bold text-red-600"> pending </h1>
          </div>
        </Link>
      ))}
    </Confidential>
  );
};

export default Papers;

