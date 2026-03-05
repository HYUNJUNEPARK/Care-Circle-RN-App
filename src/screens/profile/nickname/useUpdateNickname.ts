import { useState } from 'react';
import { updateNickname } from '../../../network/apis/userApis';

/**
 * 닉네임 변경 훅
 */
export default function useUpdateNickname() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    //const [success, setSuccess] = useState(false);

    const update = async (nickname: string) => {
        setLoading(true);
        setError(null);
        //setSuccess(false);
        try {
            await updateNickname(nickname);
            //setSuccess(true);
        } catch (err: any) {
            console.error('닉네임 변경 실패:', err);
            setError(err?.response?.data?.message || err.message || '닉네임 변경 실패');
        } finally {
            setLoading(false);
        }
    };

    return { update, loading, error };
}
