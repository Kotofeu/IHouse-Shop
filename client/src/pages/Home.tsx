import Container from '../components/Container/Container';

import { CategoriesNavigation } from '../modules/Categories';
import { ComprehensiveOfferSection } from '../modules/ComprehensiveOffer';
import { PromotionSection } from '../modules/Goods'
import { PartnersSection } from '../modules/Partners'

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