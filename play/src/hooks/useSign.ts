import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, type FormRules } from 'element-plus';
import { useEplForm, type TFormItem } from '@element-plus-pro/components';

interface ISignInForm {
  username: string;
  password: string;
}

class CSignInForm implements ISignInForm {
  username = '';
  password = '';
}

interface ISignUpForm extends ISignInForm {
  confirmPassword: string;
}

class CSignUpForm extends CSignInForm implements ISignUpForm {
  confirmPassword = '';
}

const signInRules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};

const signInFormItems: TFormItem[] = [
  {
    label: '用户名',
    labelPosition: 'top',
    prop: 'username',
    compProps: {
      placeholder: '请输入用户名',
      size: 'large',
      autocomplete: 'off',
    },
  },
  {
    label: '密码',
    labelPosition: 'top',
    prop: 'password',
    compProps: {
      placeholder: '请输入密码',
      size: 'large',
      showPassword: true,
      autocomplete: 'new-password',
    },
  },
];

export function useSignIn() {
  const router = useRouter();

  const signInForm = ref(new CSignInForm());
  const { formComp: SignInFormComp, validate } = useEplForm({
    modelValue: signInForm,
    rules: signInRules,
    items: signInFormItems,
  });

  const onSignIn = () => {
    validate()?.then(() => {
      ElMessage.success('登录成功');
      router.push({
        name: 'Home',
      });
    });
  };

  return {
    SignInFormComp,
    onSignIn,
  };
}

export function useSignUp() {
  const signUpForm = ref(new CSignUpForm());
  const signUpRules: FormRules = {
    ...signInRules,
    confirmPassword: [
      { required: true, message: '请输入确认密码', trigger: 'blur' },
    ],
  };
  const signUpFormItems: TFormItem[] = [
    ...signInFormItems,
    {
      label: '确认密码',
      labelPosition: 'top',
      prop: 'confirmPassword',
      compProps: {
        placeholder: '请再次输入密码',
        size: 'large',
        showPassword: true,
        autocomplete: 'new-password',
      },
    },
  ];

  const { formComp: SignUpFormComp, validate: validateSignUpForm } = useEplForm(
    {
      modelValue: signUpForm,
      rules: signUpRules,
      items: signUpFormItems,
    },
  );

  return {
    SignUpFormComp,
    validateSignUpForm,
  };
}
