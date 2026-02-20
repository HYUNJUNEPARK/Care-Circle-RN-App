// 이 파일은 Babel 트랜스파일러의 설정 파일입니다.
// React Native/Expo 프로젝트에서 자바스크립트/타입스크립트 코드를 변환할 때 사용됩니다.
//
// 주요 역할:
// 1. presets: 어떤 변환 규칙(프리셋)을 사용할지 지정합니다. (여기서는 expo용 프리셋)
// 2. plugins: 추가적인 변환 플러그인을 지정합니다.
//    - module:react-native-dotenv: .env 파일의 환경변수를 @env 모듈로 import할 수 있게 해줍니다.
//    - path: 사용할 .env 파일 경로를 지정합니다. (여기서는 APP_ENV 값에 따라 .env.production 또는 .env.development)

module.exports = {
    presets: ['babel-preset-expo'], // Expo 프로젝트용 Babel 프리셋
    plugins: [
        [
            'module:react-native-dotenv', // 환경변수 import를 위한 플러그인
            {
                moduleName: '@env', // import { VAR } from '@env' 형태로 사용
                path: process.env.APP_ENV === 'production' ? '.env.production' : '.env.development', // APP_ENV 값에 따라 환경 파일 선택
            },
        ],
    ],
};