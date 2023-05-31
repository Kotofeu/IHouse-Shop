import Container from '../components/Container/Container';
import useRequest from '../hooks/useRequest';
import { fetchCategory } from '../http/CategoryAPI';
import { useEffect } from 'react'
import { CategoriesNavigation } from '../modules/Categories';
import { ComprehensiveOfferSection } from '../modules/ComprehensiveOffer';
import { PromotionSection } from '../modules/Goods'
import { PartnersSection } from '../modules/Partners'
import { IGetAllJSON, brandStore, comprehensiveOfferStore, goodStore } from '../store';
import { ICategoryJSON, IGoodJSON } from '../store/GoodStore';

import classes from "./example.module.scss";
import { fetchGood } from '../http/GoodAPI';
import { IBrandTable } from '../store/BrandStore';
import { IComprehensiveOffer } from '../store/ComprehensiveOfferStore';
import { fetchBrand } from '../http/BrandAPI';
import { fetchComprehensiveOffer } from '../http/ComprehensiveOfferAPI';
const Home = () => {
  const [
    categories,
    categoriesIsLoading,
    categoriesError
  ] = useRequest<IGetAllJSON<ICategoryJSON>>(fetchCategory);
  const [
    goods,
    goodsIsLoading,
    goodsError
  ] = useRequest<IGetAllJSON<IGoodJSON>>(fetchGood);
  const
    [
      brands,
      brandsIsLoading,
      brandsError
    ] = useRequest<IGetAllJSON<IBrandTable>>(fetchBrand);

  useEffect(() => {
    if (goods && (goods !== goodStore.goods)) {
      goodStore.setGoods(goods)
    }
    if (categories && (categories !== goodStore.categories)) {
      goodStore.setCategories(categories)
    }
    if (brands && (brands !== brandStore.brands)) {
      brandStore.setBrands(brands)
    }


  }, [categories, categories, brands])
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