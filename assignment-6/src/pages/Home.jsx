import FilterSection from "../components/FilterSection";
import PostsContainer from "../components/PostsContainer";

const Home = () => {
  return (
    <section className="wrapper">
      <FilterSection />
      <PostsContainer />
    </section>
  );
};

export default Home;
