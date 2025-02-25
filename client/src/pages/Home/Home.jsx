import "./Home.css";
import CoverImage from "../../components/CoverImage";
import LinkCard from "../../components/LinkCard";
import Review from "../../components/Review";

function Home() {
  return (
    <div className="container">
      <CoverImage />
      <section className="text-block">
        <h3>
          Dobro došli u <span>Meat Your Maker</span>
        </h3>
        <p>
          Ovo je najbolji i najuspješniji program fast food dostave u Splitu.
          Još od davne 2024. godine imali smo san otvoriti vlastiti &quot;fast
          food place&quot; i evo taj daleki san se napokon obistinio. Ono po
          čemu se razlikujemo od naše konkurencije i onaj dio naše dostave kojim
          se najviše ponosimo jest mogućnost izrade vlastitih hamburgera i pizza
          po volji upravo ovdje na našoj stranici (Make-A-Meal funkcija). Pa što
          čekaš?! Naruči svoju savršenu narudžbu danas!
        </p>
      </section>
      <section className="link-cards">
        <div>
          <LinkCard
            step="1"
            instruction="Prijavi se sad!"
            path="/#"
            name="Login"
          />
          <LinkCard
            step="2"
            instruction="Pronađi nešto za jesti!"
            path="/meni"
            name="Meni"
          />
          <LinkCard
            step="3"
            instruction="Složi savršen obrok!"
            path="/make-a-meal"
            name="Make-A-Meal"
          />
        </div>
        <LinkCard
          step="4"
          instruction="...MLJAC!😋"
          path="/narudzba"
          name="Narudžba"
        />
      </section>
      <section className="reviews">
        <h2>
          Naša jela i sastojci su ukusni. Ne vjerujte nama na riječ, već
          našim recenzentima:
        </h2>
        <div>
          <Review
            image="src\assets\pfp_shrek.jpg"
            reviewer="ShrekLover12"
            stars={5}
            review="Najbolja pizza u Splitu."
          ></Review>
          <Review
            image="src\assets\pfp_cat.jpg"
            reviewer="meowUwU"
            stars={4}
            review="Dobar izbor priloga i ukusna hrana.😁👍"
          ></Review>
          <Review
            image="src\assets\pfp_sonic.png"
            reviewer="GottaGoFast99"
            stars={2}
            review="Dobia san salmonelu."
          ></Review>
        </div>
      </section>
    </div>
  );
}

export default Home;
