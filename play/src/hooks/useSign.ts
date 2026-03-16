import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, type FormRules } from 'element-plus';
import { useEplForm, type TFormItem } from '@element-plus-lego/components';

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
  const [SignInFormComp, formRef] = useEplForm({
    modelValue: signInForm,
    rules: signInRules,
    items: signInFormItems,
  });

  const onSignIn = () => {
    formRef.value?.validate()?.then(() => {
      const user = JSON.parse(
        sessionStorage.getItem(signInForm.value.username) || '{}',
      );
      if (user?.password !== signInForm.value.password) {
        ElMessage.error('用户名不存在或密码错误');
        return;
      }
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

  const { Component: SignUpFormComp, instance: formRef } = useEplForm({
    modelValue: signUpForm,
    rules: signUpRules,
    items: signUpFormItems,
  });

  const validateSignUpForm = async () => {
    await formRef.value?.validate();
  };

  const saveUser = () => {
    const user = sessionStorage.getItem(signUpForm.value.username);

    if (user) {
      ElMessage.error('用户已存在');
      return;
    }

    sessionStorage.setItem(
      signUpForm.value.username,
      JSON.stringify(signUpForm.value),
    );
    ElMessage.success('注册成功');
  };

  return {
    SignUpFormComp,
    validateSignUpForm,
    saveUser,
  };
}
