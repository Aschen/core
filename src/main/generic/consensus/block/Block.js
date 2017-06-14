class Block {
    constructor(header, body) {
        if (!(header instanceof BlockHeader)) throw 'Malformed header';
        if (!(body instanceof BlockBody)) throw 'Malformed body';
        this._header = header;
        this._body = body;
    }

    static unserialize(buf) {
        const header = BlockHeader.unserialize(buf);
        const body = BlockBody.unserialize(buf);
        return new Block(header, body);
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        this._header.serialize(buf);
        this._body.serialize(buf);
        return buf;
    }

    get serializedSize() {
        return this._header.serializedSize
            + this._body.serializedSize;
    }

    get header() {
        return this._header;
    }

    get body() {
        return this._body;
    }

    get prevHash() {
        return this._header.prevHash;
    }

    get bodyHash() {
        return this._header.bodyHash;
    }

    get accountsHash() {
        return this._header.accountsHash;
    }

    get nBits() {
        return this._header.nBits;
    }

    get target() {
        return this._header.target;
    }

    get difficulty() {
        return this._header.difficulty;
    }

    get height() {
        return this._header.height;
    }

    get timestamp() {
        return this._header.timestamp;
    }

    get nonce() {
        return this._header.nonce;
    }

    get minerAddr() {
        return this._body.minerAddr;
    }

    get transactions() {
        return this._body.transactions;
    }

    get transactionCount() {
        return this._body.transactionCount;
    }

    hash() {
        return this._header.hash();
    }
}

/* Genesis Block */
Block.GENESIS = new Block(
    new BlockHeader(
        new Hash(null),
        new Hash(BufferUtils.fromBase64('Xmju8G32zjPl4m6U/ULB3Nyozs2BkVgX2k9fy5/HeEg=')),
        new Hash(BufferUtils.fromBase64('3OXA29ZLjMiwzb52dseSuRH4Reha9lAh4qfPLm6SF28=')),
        BlockUtils.difficultyToCompact(1),
        1,
        0,
        38760),
    new BlockBody(new Address(BufferUtils.fromBase64('kekkD0FSI5gu3DRVMmMHEOlKf1I')), [])
);
// Store hash for synchronous access
Block.GENESIS.HASH = Hash.fromBase64('AACIm7qoV7ybhlwQMvJrqjzSt5RJtq5++xi8jg91jfU=');
Block.GENESIS.hash().then(hash => {
    Block.GENESIS.HASH = hash;
    //Object.freeze(Block.GENESIS);
});

/* Checkpoint Block */
Block.CHECKPOINT = new Block(
    new BlockHeader(
        /*prevHash*/ new Hash(BufferUtils.fromBase64('AAAACdbTMlTcKYbSq3ATfpsmSy6IS8nw/bwvucUky7I=')),
        /*bodyHash*/ new Hash(BufferUtils.fromBase64('/kaYKm3eQHvfbRVYF7c9EcUFSvOfxOUKUkfMcqcsEhI=')),
        /*accountsHash*/ new Hash(BufferUtils.fromBase64('NyuaRopqGXAIbbBzGiEw0gnYeZANn0HrYRe0ymmZvXY=')),
        /*nBits*/ 489647025,
        /*height*/ 9201,
        /*timestamp*/ 1497416512,
        /*nonce*/ 401970,
        /*version*/ 1),
    new BlockBody(new Address(BufferUtils.fromBase64('DmcMtPHsPK8Aukd29hbmYll6OGE=')), [
        Transaction.unserialize(BufferUtils.fromBase64("AAEA0fEP7tRKarlWyIFU5+Ai2VCUXEhnbqWZgzFZom1o1cfW2KlC0w3xWXCwZUhgZ6Ed3iYhxGUpJV34mEMZGu3cuMLQnv5fnlAOfKNKOjyTTSTiUFOgQfKgXyAAAAAAAAAAAAAAAAAAAA1rer6nvFcD+Yzw/E3MBiENC19ib+l+wIKp2BRGyGtnP5QwacrnrK6StLtTSf91KqL0pkmc7mt55Yfeh5RJ7iKW"))
    ])
);
Block.CHECKPOINT.hash().then(hash => {
    Block.CHECKPOINT.HASH = hash;
    //Object.freeze(Block.GENESIS);
});
Block.CHECKPOINT.TOTAL_WORK = 25588486.12992787;
Block.OLD_CHECKPOINTS = new IndexedArray([
    new Hash(BufferUtils.fromBase64('AAAACxKJIIfQb99dTIuiRyY6VkRlzBfbyknKo/515Ho=')),
    new Hash(BufferUtils.fromBase64('AAAAJHtA0SSxZb+sk2T9Qtzz4bWZdfz8pqbf5PNjywI='))
]);
Class.register(Block);
