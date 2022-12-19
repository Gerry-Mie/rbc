import {FC} from 'react';
import ThemeProvider from '../theme/theme-provider';
import {Provider as ReduxProvider} from 'react-redux'
import store from '../store';
import {NotificationsProvider} from '@mantine/notifications';

const provider = (App: FC) => () => {
	return (
		<ReduxProvider store={store}>
			<ThemeProvider>
				<NotificationsProvider>
					<App/>
				</NotificationsProvider>
			</ThemeProvider>
		</ReduxProvider>
	);
}

export default provider
