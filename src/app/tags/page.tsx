import { getAllTags } from 'src/utils/notion';

const Tags = async () => {
    const tagCount = await getAllTags();
    return (
        <div>
            <div>Tags</div>
            <div>{tagCount}</div>
        </div>
    );
};

export default Tags;
