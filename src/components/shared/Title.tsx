import { Helmet } from "react-helmet-async";
const Title = ({
  title = "chats",
  description = "This is the description",
}) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name={"description"} content={description} />
      </Helmet>
    </>
  );
};

export default Title
