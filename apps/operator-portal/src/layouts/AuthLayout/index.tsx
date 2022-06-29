import { FC, ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../store';
import { logoutUser, setUser } from '../../reducers/userReducer';
import { User } from 'types';

type Props = {
    children: ReactElement;
    user: User;
};

const AuthLayout: FC<Props> = ({ children, user }) => {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.user.token);
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            dispatch(logoutUser());
            router.push('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    useEffect(() => {
        dispatch(
            setUser({
                token: token || '',
                user,
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return <>{children}</>;
};
export default AuthLayout;
