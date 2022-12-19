import useNavSelector from '../../hooks/useNavSelector';
import {useDocumentTitle} from '@mantine/hooks';
import {Title} from '@mantine/core';

const Events = () => {
	useNavSelector('Events')
	useDocumentTitle('Events | RBC')
	return (
		<Title order={2}>Events</Title>
	)
}
export default Events
