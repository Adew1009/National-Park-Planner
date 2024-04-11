import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Card className="bg-dark text-white">
      <Card.Img
        src="https://thedeepeningground.files.wordpress.com/2023/04/pexels-photo-338936.jpeg"
        alt="Card image"
      />
      <Card.ImgOverlay>
        <br></br>
        <Card.Title>PAGE NOT FOUND</Card.Title>
        <br></br>
        <br></br>
        <br></br>
        <Card.Text>
          It appears you the trail you are traveling on has ended. Don't worry
          here is a button to get you on the right path.
        </Card.Text>
        <>
          <Button variant="light" as={Link} to="/">
            Home
          </Button>
        </>
        <Card.Text>Lets get you back onthe right track!</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
};

export default NotFoundPage;
