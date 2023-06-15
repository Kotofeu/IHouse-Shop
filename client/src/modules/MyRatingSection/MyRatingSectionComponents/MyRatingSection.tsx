import React, { useEffect, useState } from 'react';
import useRequest from '../../../utils/hooks/useRequest';
import { observer } from 'mobx-react-lite';
import { IGetAllJSON } from '../../../store';
import { IRating, ratingStore } from '../../../store/RatingStore';
import { fetchRatingByUser } from '../../../http/RatingAPI';
import SectionList from '../../../components/SectionList/SectionList';
import RatingCard from '../../../components/RatingCard/RatingCard';
import defaultUser from '../../../assets/icons/User-icon.svg';
import ServerImage from '../../../UI/ServerImage/ServerImage';
import Title from '../../../UI/Title/Title';
import ContactLink, { ContactLinkType } from '../../../UI/ContactLink/ContactLink';
import { useNavigate, useParams } from 'react-router-dom';
import { IUser, userStore } from '../../../store/UserStore';
import { getUserById } from '../../../http/userAPI';
import classes from './MyRatingSection.module.scss';

export const MyRatingSection = observer(() => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;
  const [rating, isRatingLoading, ratingError, , setUserId] = useRequest<IGetAllJSON<IRating>>(fetchRatingByUser, undefined);
  const [userById, userLoading, userError,] = useRequest<IUser>(getUserById, id);
  const user = userById ?? userStore.user;
  let image = user?.image;
  let email = user?.users_authorization?.email;
  let phone = user?.phone;
  let name = user?.name;
  let role = user?.users_authorization?.role || "USER";
  let date = user?.createdAt ? new Date(user?.createdAt) : undefined;

  useEffect(() => {
    if (userStore.user?.id && (!id || !userById)) {
      setUserId(userStore.user.id);
    }
    if (id && userById) {
      setUserId(id);
    }
    if (params.id && (userError || !userById && !userLoading)) {
      navigate('/rating');
    }
  }, [userStore.user?.id, id, userById, userError, userLoading]);

  useEffect(() => {
    if (rating) {
      ratingStore.setRatings(rating);
    }
  }, [rating]);

  return (
    <SectionList
      className={classes.rating}
      error={ratingError || userError}
      emptySubtitle={id ? 'Пользователь не оставлял отзывов' : 'Вы не оставляли отзывов'}
      isLoading={isRatingLoading || (userLoading && !!id)}
      items={ratingStore.ratings?.rows || []}
      renderItem={rating => (
        <RatingCard
          key={rating.id}
          className={classes.rating_card}
          rating={rating}
        />
      )}
      header={(
        <header className={classes.rating_header}>
          <div className={classes.rating_headerMain}>
            <div className={classes.rating_user}>
              <ServerImage
                className={classes.rating_userImage}
                src={image || undefined}
                altSrc={defaultUser}
                alt={name || ''}
              />
              <Title className={classes.rating_username}>{[name, ' (', role, ')'].join('')}</Title>
            </div>
            {date ?
              <div className={classes.rating_userCreatedAt}>
                Зарегестрирован: {date.toLocaleDateString()}
              </div>
              : null
            }
          </div>
          <div className={classes.rating_contacts}>
            {phone ?
              <ContactLink className={classes.rating_userContact} href={phone} linkType={ContactLinkType.tel} />
              : null
            }
            {email ?
              <ContactLink className={classes.rating_userContact} href={email} linkType={ContactLinkType.email} />
              : null
            }
          </div>
        </header>
      )}
    />
  );
});
