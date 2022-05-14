exports.run = async (client, message) => {
    await client.update();
    await message.reply({ content: 'Updated!' });
};

exports.conf = {
    name: 'update',
    Isdev: true,

};