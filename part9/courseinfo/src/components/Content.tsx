import { CoursePart } from "../types/courseParts";
import Part from "./Part";
import { assertNever } from "../utils";

type ContentProps = { courseContent: CoursePart[] };

export default function Content({ courseContent }: ContentProps) {
  return (
    <>
      {courseContent.map((course: CoursePart) => {
        switch (course.type) {
          case "normal":
            return (
              <p>
                <Part
                  title={course.name}
                  number={course.exerciseCount}
                  italicsLine={course.description}
                />
              </p>
            );
          case "groupProject":
            return (
              <p>
                <Part
                  title={course.name}
                  number={course.exerciseCount}
                  regularLine={`project exercises ${course.groupProjectCount}`}
                />
              </p>
            );
          case "submission":
            return (
              <p>
                <Part
                  title={course.name}
                  number={course.exerciseCount}
                  italicsLine={course.description}
                  regularLine={`submit to ${course.exerciseSubmissionLink}`}
                />
              </p>
            );
          default:
            assertNever(course);
        }
      })}
    </>
  );
}
