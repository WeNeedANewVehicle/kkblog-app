export const messages = {
  validation: {
    password: {
      not_match: '비밀번호가 일치하지 않습니다.',
      min_length: '비밀번호는 최소 8자 이상입니다.',
      max_length: '비밀번호는 최대 20자 입니다.',
    },
    email: {
      invalid: '유효한 이메일 형식이 아닙니다.',
    },
    nickname: {
      min_length: '닉네임은 최소 3자 이상입니다.',
      max_length: '닉네임은 최소 16자 이하입니다.',
      invalid: '닉네임에 특수문자를 포함할 수 없습니다.',
      required: '닉네임을 입력해주세요.',
    },

    auth: {
      invalid_bearer_token: 'Bearer 토큰 검증 실패',
    },
  },

  storage: {
    auth: {
      set_access_token_failed:
        '엑세스 토큰을 로컬 스토리지에 저장하는데 실패했습니다.',
      get_access_token_failed: '엑세스 토큰을 가져오지 못했습니다.',
    },
    redirection: {
      set_redirect_url_failed: '리디렉션 URL 설정에 실패했습니다.',
      get_redirect_url_failed: '리디렉션 URL을 가져오지 못했습니다.',
    },
  },

  context: {
    cannot_find_app_context: 'AppContext를 찾을 수 없습니다.',
    cannot_find_set_app_context: 'SetAppContext를 찾을 수 없습니다.',
  },
}
