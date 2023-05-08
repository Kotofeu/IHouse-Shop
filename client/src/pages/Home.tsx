import { PromotionSection } from '../modules/Goods'
import { PartnersSection } from '../modules/Partners'

import classes from "./example.module.scss";
const Home = () => {
  return (
    <div className={classes.home}>
      <PartnersSection/>
      <PromotionSection/>
    </div>
  )
}

export default Home