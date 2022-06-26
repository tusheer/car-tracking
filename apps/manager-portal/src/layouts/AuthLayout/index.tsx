import { FC, ReactElement, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../modules/common/hooks';
import { logoutUser } from '../../reducers/userReducer';

type Props = {
    children: ReactElement;
};

const AuthLayout: FC<Props> = ({ children }) => {
    const dispatch = useAppDispatch();
    const { token } = useAppSelector((state) => state.user);
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            dispatch(logoutUser());
            router.push('/');
        }
    }, [token]);

    return <>{children}</>;
};
export default AuthLayout;
