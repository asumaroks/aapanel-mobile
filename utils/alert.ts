import { Alert as NativeAlert, AlertButton, Platform } from 'react-native';

export const Alert = {
  alert(title: string, message?: string, buttons?: AlertButton[]) {
    if (Platform.OS !== 'web') return NativeAlert.alert(title, message, buttons);
    document.getElementById('panel-alert')?.remove();
    const dialog = document.createElement('dialog');
    dialog.id = 'panel-alert';
    dialog.setAttribute('aria-label', title);
    dialog.style.cssText = 'max-width:420px;width:calc(100% - 48px);padding:24px;border:0;border-radius:16px;font:16px system-ui;background:#fff;color:#111827';
    const heading = document.createElement('h2');
    heading.textContent = title;
    const content = document.createElement('p');
    content.textContent = message || '';
    content.style.whiteSpace = 'pre-wrap';
    const actions = document.createElement('div');
    actions.style.cssText = 'display:flex;gap:12px;justify-content:flex-end';
    for (const button of buttons?.length ? buttons : [{ text: 'OK' }]) {
      const control = document.createElement('button');
      control.textContent = button.text || 'OK';
      control.style.cssText = 'padding:10px 16px;border:0;border-radius:8px;cursor:pointer';
      control.onclick = () => { dialog.close(); dialog.remove(); button.onPress?.(); };
      actions.append(control);
    }
    dialog.oncancel = () => { dialog.remove(); buttons?.find(button => button.style === 'cancel')?.onPress?.(); };
    dialog.append(heading, content, actions);
    document.body.append(dialog);
    dialog.showModal();
  },
};
