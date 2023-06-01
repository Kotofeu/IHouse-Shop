import Container from '../UI/Container/Container';
import { CategoriesNavigation } from '../modules/Categories';
import { ComprehensiveOfferSection } from '../modules/ComprehensiveOffer';
import { PartnersSection } from '../modules/Partners'
import { PromotionSection } from '../modules/Promotion';

import classes from "./example.module.scss";

const Home = () => {
  return (
    <div className={classes.home}>
      <Container>
        <div className={classes.home_inner}>
          <CategoriesNavigation />
          <div className={classes.home_content}>

            <PromotionSection />
            <ComprehensiveOfferSection />
            <PartnersSection />

          </div>
        </div>
      </Container>

    </div>
  )
}

export default Home