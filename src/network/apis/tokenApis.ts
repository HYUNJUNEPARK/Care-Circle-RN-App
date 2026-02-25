import privateAxios from '../axios/privateAxios';

const tokenApiUrl = `/api/token`;

/**
 * 커스텀 토큰 발급 요청
 */
export async function getCustomToken(): Promise<string> {
    const res = await privateAxios.post(
        `${tokenApiUrl}/custom-token`
    );

    if(!res.data.success) {
        throw new Error(`Custom token request failed`);
    }

    return "";
}