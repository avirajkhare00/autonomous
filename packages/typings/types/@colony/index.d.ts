declare module '@colony/colony-js-client' {
  import { Contract } from '@colony/colony-js-adapter'
  import { ContractResponse, SendOptions } from '@colony/colony-js-contract-client'
  import BigNumber from 'bn.js'

  type TypedEventCallback<ParamTypes> = (args: ParamTypes) => void

  export class ContractEvent<T> {
    addListener(handlerFunction: TypedEventCallback<T>): void
    removeListener(handlerFunction: TypedEventCallback<T>): void
  }

  export class ColonyClient {
    contract: Contract
    /*
      Helper function used to generate the rating secret used in task ratings. Accepts a salt value and a value to hide, and returns the keccak256 hash of both.
    */
    generateSecret: Caller<{
      salt: string, // Salt value
      value: number // Value to hide
    },
      {
        secret: string // keccak256 hash of joint Salt and Value
      }>
    /*
      Gets the selected domain's local skill ID and funding pot ID
    */
    getDomain: Caller<{
      domainId: number // ID of the domain
    },
      {
        localSkillId: number, // The domain's local skill ID
        potId: number // The domain's funding pot ID
      }>
    /*
      Gets the total number of domains in a Colony. This number equals the last `domainId` created.
    */
    getDomainCount: NoInputCaller<{
      count: number // Number of all domain in this Colony; == the last added domainId
    }>
    /*
      Gets the total number of reward payout cycles.
    */
    getGlobalRewardPayoutCount: NoInputCaller<{
      count: number // Number of reward payout cycles
    }>
    /*
      Gets the number of claimed and waived reward payouts for a given user.
    */
    getUserRewardPayoutCount: Caller<{
      user: Address // Address of user
    },
      {
        count: number // Number of claimed and waived reward payouts
      }>
    /*
      Gets the total number of tasks in a Colony. This number equals the last `taskId` created.
    */
    getTaskCount: NoInputCaller<{
      count: number // Total number of tasks in this Colony
    }>
    /*
      Gets a certain task defined by its integer taskId
    */
    getTask: Caller<{ taskId: number },
      {
        cancelled: boolean,             // Boolean flag denoting whether the task is cancelled.
        deliverableDate?: Date,         // Date when the deliverable is due.
        deliverableHash?: IPFSHash,     // Unique hash of the deliverable content.
        domainId: number,               // Integer Domain ID the task belongs to.
        dueDate?: Date,                 // When the task is due.
        finalized: boolean,             // Boolean flag denoting whether the task is finalized.
        id: number,                     // Integer task ID.
        payoutsWeCannotMake?: number,   // Number of payouts that cannot be completed with the current task funding.
        potId?: number,                 // Integer ID of funding pot for the task.
        skillId: number,                // Integer Skill ID the task is assigned to.
        specificationHash: IPFSHash     // Unique hash of the specification content.
      }>
    /*
      Given a specific task, a defined role for the task, and a token address, will return any payout attached to the task in the token specified.
    */
    getTaskPayout: Caller<{
      taskId: number, // Integer taskId
      role: Role, // Role the payout is specified for: MANAGER, EVALUATOR, or WORKER
      token: Address // Address of the token's contract
    },
      {
        amount: BigNumber // Amount of specified tokens to payout for that task and a role
      }>
    /*
      Every task has three roles associated with it which determine permissions for editing the task, submitting work, and ratings for performance.
    */
    getTaskRole: Caller<{
      taskId: number, // Integer taskId
      role: Role // MANAGER, EVALUATOR, or WORKER
    },
      {
        address: Address, // Address of the user for the given role
        rated: boolean, // Has the user work been rated
        rating: number // Rating the user received
      }>
    /*
      For a given task, will return the number of submitted ratings and the date of their submission
    */
    getTaskWorkRatings: Caller<{
      taskId: number // Integer taskId
    },
      {
        count: number, // Total number of submitted ratings for a task.
        date: Date // Date of the last submitted rating.
      }>
    /*
      If ratings for a task are still in the commit period, their ratings will still be hidden, but the hashed value can still be returned.
    */
    getTaskWorkRatingSecret: Caller<{
      taskId: number, // Integer taskId
      role: Role // Role that submitted the rating: MANAGER, EVALUATOR, or WORKER
    },
      {
        secret: string // the hashed rating (equivalent to the output of `keccak256(_salt, _rating)`).
      }>
    /*
      Gets a balance for a certain token in a specific pot
    */
    getPotBalance: Caller<{
      potId: number, // Integer potId
      token: Address // Address of the token's contract
    },
      {
        balance: BigNumber // Balance for token `token` in pot `potId`
      }>
    /*
      The `nonRewardPotsTotal` is a value that keeps track of the total assets a colony has to work with, which may be split among several distinct pots associated with various domains and tasks.
    */
    getNonRewardPotsTotal: Caller<{
      address: Address // Address of the token's contract (token in question)
    },
      {
        total: BigNumber // All tokens that are not within the colony's `rewards` pot.
      }>
    /*
      Given a specific payout, returns useful information about the payout.
    */
    getRewardPayoutInfo: Caller<{
      payoutId: number // Id of the reward payout
    },
      {
        blockNumber: number, // Block number at the time of creation
        remainingTokenAmount: BigNumber, // Remaining (unclaimed) amount of tokens
        reputationRootHash: string, // Reputation root hash at the time of creation
        tokenAddress: Address, // Token address
        totalTokenAmountForRewardPayout: BigNumber, // Total amount of tokens taken aside for reward payout
        totalTokens: BigNumber // Total colony tokens at the time of creation
      }>
    /*
      Gets the address of the colony's official token contract
    */
    getToken: NoInputCaller<{
      address: Address // The address of the colony's official deployed token contract
    }>
    /*
      Returns the total number of transactions the colony has made, == the `transactionId` of the last added transaction to the Colony.
    */
    getTransactionCount: NoInputCaller<{
      count: number // Number of all transactions in this Colony; == the last added transactionId
    }>
    /*
      Creates a new task by invoking `makeTask` on-chain.
    */
    createTask: Sender<{
      specificationHash: IPFSHash, // Hashed output of the task's work specification, stored so that it can later be referenced for task ratings or in the event of a dispute.
      domainId?: number // Domain in which the task has been created (default value: `1`).
    },
      {
        taskId: number // Will return an integer taskId, from the `TaskAdded` event.
      }>
    /*
      The task brief, or specification, is a description of the tasks work specification. The description is hashed and stored with the task for future reference in ratings or in the event of a dispute.
    */
    setTaskBrief: MultisigSender<{
      taskId: number, // Integer taskId
      specificationHash: IPFSHash // digest of the task's hashed specification.
    },
      {}>
    /*
      Every task must belong to a single existing Domain.
    */
    setTaskDomain: Sender<{
      taskId: number, // Integer taskId
      domainId: number // Integer domainId
    },
      {}>
    /*
      The task's due date determines when a worker may submit the task's deliverable(s)
    */
    setTaskDueDate: MultisigSender<{
      taskId: number, // Integer taskId
      dueDate: Date // Due date
    },
      {}>
    /*
      Set the user for role `_role` in task `_id`. Only allowed before the task is `finalized`, meaning that the value cannot be changed after the task is complete.
    */
    setTaskRoleUser: Sender<{
      taskId: number, // Integer taskId
      role: Role, // MANAGER, EVALUATOR, or WORKER
      user: Address // address of the user
    },
      {}>
    /*
    Sets the skill tag associated with the task. Currently there is only one skill tag available per task, but additional skills for tasks are planned in future implementations.
    */
    setTaskSkill: Sender<{
      taskId: number, // Integer taskId
      skillId: number // Integer skillId
    },
      {}>
    /*
      Sets the payout given to the EVALUATOR role when the task is finalized.
    */
    setTaskEvaluatorPayout: MultisigSender<{
      taskId: number, // Integer taskId
      token: Address, // Address of the token's ERC20 contract.
      amount: BigNumber // Amount to be paid.
    },
      {}>
    /*
      Sets the payout given to the MANAGER role when the task is finalized.
    */
    setTaskManagerPayout: MultisigSender<{
      taskId: number, // Integer taskId
      token: Address, // Address of the token's ERC20 contract.
      amount: BigNumber // Amount to be paid.
    },
      {}>
    /*
      Sets the payout given to the WORKER role when the task is finalized.
    */
    setTaskWorkerPayout: MultisigSender<{
      taskId: number, // Integer taskId
      token: Address, // Address of the token's ERC20 contract.
      amount: BigNumber // Amount to be paid.
    },
      {}>
    /*
      Submit the task deliverable, i.e. the output of the work performed for task `_id` Submission is allowed only to the assigned worker before the task due date. Submissions cannot be overwritten
    */
    submitTaskDeliverable: Sender<{
      taskId: number, // Integer taskId
      deliverableHash: IPFSHash // Hash of the work performed
    },
      {}>
    /*
      Submits a hidden work rating for a task. This is generated by generateSecret(_salt, _rating).
    */
    submitTaskWorkRating: Sender<{
      taskId: number, // Integer taskId
      role: Role, // The role submitting their rating, either EVALUATOR or WORKER
      ratingSecret: string // hidden work rating, generated as the output of `generateSecret(_salt, _rating)`, where `_rating` is a score from 0-50 (in increments of 10).
    },
      {}>
    /*
      Reveals a previously submitted work rating, by proving that the `_rating` and `_salt` values result in the same `ratingSecret` submitted during the rating submission period. This is checked on-chain using the `generateSecret` function.
    */
    revealTaskWorkRating: Sender<{
      taskId: number, // Integer taskId
      role: Role, // Role revealing their rating submission, either EVALUATOR or WORKER
      rating: number, // Rating scored 0-50 in increments of 10 (e.g. 10, 20, 30, 40 or 50).
      salt: string // `_salt` value to be used in `generateSecret`. A correct value will result in the same `ratingSecret` submitted during the work rating submission period.
    },
      {}>
    /*
      In the event of a user not committing or revealing within the 10 day rating window, their rating of their counterpart is assumed to be the highest possible and their own rating is decreased by 5 (e.g. 0.5 points). This function may be called by anyone after the taskWorkRatings period has ended.
    */
    assignWorkRating: Sender<{
      taskId: number // Integer taskId
    },
      {}>
    /*
      Cancels a task.
    */
    cancelTask: Sender<{
      taskId: number // Integer taskId
    },
      {}>
    /*
      Finalizes a task, allowing roles to claim payouts and prohibiting all further changes to the task.
    */
    finalizeTask: Sender<{
      taskId: number // Integer taskId
    },
      {}>
    /*
      Claims the payout in `_token` denomination for work completed in task `_id` by contributor with role `_role`. Allowed only by the contributors themselves after task is finalized. Here the network receives its fee from each payout. Ether fees go straight to the Common Colony whereas Token fees go to the Network to be auctioned off.
    */
    claimPayout: Sender<{
      taskId: number, // Integer taskId
      role: Role, // Role of the contributor claiming the payout: MANAGER, EVALUATOR, or WORKER
      token: Address // Address of the token contract
    },
      {}>
    /*
      Adds a domain to the Colony along with the new domain's respective local skill.
    */
    addDomain: Sender<{
      parentSkillId: number // Id of the local skill under which the new skill will be added.
    },
      {
        skillId: number, // A skillId for this domain
        parentSkillId: number // The parent skill id
      }>
    /*
      Adds a global skill under a given parent SkillId. Can only be called from the Common Colony
    */
    addGlobalSkill: Sender<{
      parentSkillId: number // Integer id of the parent skill
    },
      {
        skillId: number, // Integer id of the newly created skill
        parentSkillId: number // Integer id of the parent skill
      }>
    /*
      Move any funds received by the colony in `token` denomination to the top-levl domain pot, siphoning off a small amount to the rewards pot. No fee is taken if called against a colony's own token.
    */
    claimColonyFunds: Sender<{
      token: Address // Address of the token contract. `0x0` value indicates Ether.
    },
      {}>
    /*
      Finalises the reward payout and allows creation of next reward payout for token that has been used in `payoutId`. Can only be called when reward payout cycle is finished, i.e. 60 days from its creation.
    */
    finalizeRewardPayout: Sender<{
      payoutId: number // Id of the reward payout.
    },
      {}>
    /*
      Move a given amount of `token` funds from one pot to another
    */
    moveFundsBetweenPots: Sender<{
      fromPot: number, // Origin pot Id
      toPot: number, // Destination pot Id
      amount: BigNumber, // Amount of funds to move
      address: Address // Address of the token contract
    },
      {}>
    /*
      The owner of a Colony may mint new tokens.
    */
    mintTokens: Sender<{
      amount: number // Amount of new tokens to be minted
    },
      {}>
    /*
      In the case of the Colony Network, only the Common Colony may mint new tokens
    */
    mintTokensForColonyNetwork: Sender<{
      amount: number // Amount of new tokens to be minted
    },
      {}>
    /*
      Start the next reward payout for `token`. All funds in the reward pot for `token` will become unavailable. All tokens will be locked, and can be unlocked by calling `waiveRewardPayout` or `claimRewardPayout`.
    */
    startNextRewardPayout: Sender<{
      token: Address // Address of token used for reward payout.
    },
      {}>
    /*
      Waive reward payout. This unlocks the sender's tokens and increments the users reward payout counter, allowing them to claim the next reward payout.
    */
    waiveRewardPayouts: Sender<{
      numPayouts: number // Number of payouts to waive
    },
      {}>

    events: {
      TaskAdded: ContractEvent<{ id: number }>,
      TaskBriefChanged: ContractEvent<{
        id: number,
        specificationHash: string
      }>,
      TaskDueDateChanged: ContractEvent<{
        id: number,
        dueDate: Date
      }>,
      TaskDomainChanged: ContractEvent<{
        id: number,
        domainId: number
      }>,
      TaskSkillChanged: ContractEvent<{
        id: number,
        skillId: number
      }>,
      TaskRoleUserChanged: ContractEvent<{
        id: number,
        role: number,
        user: Address
      }>,
      TaskWorkerPayoutChanged: ContractEvent<{
        id: number,
        token: Address,
        amount: number
      }>,
      TaskFinalized: ContractEvent<{
        id: number
      }>,
      TaskCanceled: ContractEvent<{
        id: number
      }>
    }

  }

  export type NoInputCaller<O> = {
    call (): Promise<O>
  }

  export type Caller<I, O> = {
    call (input: I): Promise<O>
  }

  export type Sender<I, O> = {
    send (input: I, options?: Partial<SendOptions>): Promise<ContractResponse<O>>
  }
  export type MultisigSender<I, O> = (input: I) => Promise<O>
  export type Address = string
  export type Role = 'MANAGER' | 'EVALUATOR' | 'WORKER'
  export type IPFSHash = string

  export default class ColonyNetworkClient {
    /*
    Returns the address of a colony when given the ID
    */
    getColony: Caller<{
      id: number // Integer colony ID
    },
      {
        address: Address // Address of the colony contract
      }>
    /*
    Returns the address of the Meta Colony
    */
    getMetaColonyAddress: NoInputCaller<{
      address: Address // Address of the Meta Colony contract
    }>
    /*
    Returns the number of colonies created on the Colony Network, i.e. the colonyId of the most recently created colony.
    */
    getColonyCount: NoInputCaller<{
      count: number // colonyId of the most recently created colony
    }>
    /*
    Given a version of the colony contract, returns the address of the corresponding `Resolver` contract
    */
    getColonyVersionResolver: Caller<{
      version: number // The Colony contract version
    },
      {
        address: Address // Address of the `Resolver` contract
      }>
    /*
    Returns the latest Colony contract version. This is the version used to create all new colonies.
    */
    getCurrentColonyVersion: NoInputCaller<{
      version: number // The current / latest Colony contract version
    }>
    /*
    Given the id of a particular skill, returns the skill's parent skill id
    */
    getParentSkillId: Caller<{
      skillId: number, // Id of the skill
      parentSkillIndex: number // Index of the `skill.parents` array to get
    },
      {
        parentSkillId: number // Id of the parent skill
      }>
    /*
    Gets the `ReputationLogEntry` at a specified index for either ther currently active or inactive reputation update log
    */
    getReputationUpdateLogEntry: Caller<{
      id: number // The reputation log members array index of the entry to get
    },
      {
        amount: BigNumber, // amount
        colony: Address, // Address of the colony
        nPreviousUpdates: number, // number of previous updates
        nUpdates: number, // number of updates
        skillId: number, // skill Id
        user: Address // user address
      }>
    /*
    Gets the length of the reputation update log for either the current active or inactive log
    */
    getReputationUpdateLogLength: NoInputCaller<{
      count: number // Length of Reputation update log array
    }>
    /*
    Returns the number of parent and child skills associated with the provided skill
    */
    getSkill: Caller<{
      skillId: number // skillId to be checked
    },
      {
        nParents: number, // Number of parent skills
        nChildren: number // Number of child skills
      }>
    /*
    Get the total number of skills in the network (both global and local skills)
    */
    getSkillCount: NoInputCaller<{
      count: number // The number of skills on the network
    }>
    /*
      Get the amount of staked CLNY tokens for a given user address
    */
    getStakedBalance: Caller<{
      user: Address // Address of the user
    },
      {
        balance: BigNumber // Amount of staked CLNY
      }>
    /*
    Creates a new colony on the network.
    */
    createColony: Sender<{
      tokenAddress: Address // Token to import. Note: the ownership of the token contract must be transferred to the newly-created Colony.
    },
      {
        colonyId: number, // ID of the newly-created Colony
        colonyAddress: Address // Address of the newly-created Colony
      }>
    /*
      Allow a reputation miner to stake an amount of CLNY tokens, which is required before they can submit a new reputation root hash via `ReputationMiningCycle.submitNewHash`
    */
    deposit: Sender<{
      amount: BigNumber // Amount of CLNY to stake
    },
      {}>
    /*
      Create and start a new Dutch Auction for the entire amount of a specified token owned by the Colony Network
    */
    startTokenAuction: Sender<{
      tokenAddress: Address // Address of the token held by the network to be auctioned
    },
      {
        auction: string, // The address of the auction contract
        token: Address, // The address of the token being auctioned
        quantity: number // The amount of available tokens for auction
      }>
    /*
    Upgrades a colony to a new Colony contract version.
    */
    upgradeColony: Sender<{
      id: number, // Colony ID to be upgraded
      newVersion: number // The target version for the upgrade
    },
      {}>
    /*
    Allow a user who has staked CLNY to withdraw their stake
    */
    withdraw: Sender<{
      amount: BigNumber // Amount of CLNY to withdraw from stake
    },
      {}>

    constructor ({ adapter }: { adapter: any })

    createToken ({ name, symbol, decimals }: { name: string, symbol: string, decimals?: number }): string

    getColonyClientByAddress (contractAddress: Address): Promise<ColonyClient>

    getColonyClient (id: number): Promise<ColonyClient>

    getColonyAddress (id: number): Promise<Address>

    getMetaColonyClient (): Promise<ColonyClient>

    init (): Promise<void>
  }
}

declare module '@colony/colony-js-adapter' {
  import BigNumber from 'bn.js'
  import { Wallet } from 'ethers'

  export type Transaction = {
    // Exactly one of these will be present (send vs. deploy contract)
    creates?: string | null,
    to?: string | null,

    // The transaction hash
    hash: string,

    // The transaction request
    data: string,
    from: string,
    gasLimit: BigNumber,
    gasPrice: BigNumber,
    nonce: number,
    value: BigNumber,

    // The network ID (or chain ID); 0 indicates replay-attack vulnerable
    // (eg. 1 = Homestead mainnet, 3 = Ropsten testnet)
    networkId: number,

    // The raw transaction
    raw: string
  }

  export type SignedTransaction = Transaction & {
    r: string,
    s: string,
    v: number
  }

  export type TransactionReceipt = {
    blockHash: string,
    blockNumber: number,
    contractAddress: string | null,
    cumulativeGasUsed: BigNumber,
    gasUsed: BigNumber,
    hash: string,
    log: Array<any>,
    logsBloom: string,
    root: string,
    status: number, // 0 => failure, 1 => success
    transactionHash: string,
    transactionIndex: number
  }

  export type EventCallback = any

  export type TransactionOptions = {
    gasLimit?: number,
    gasPrice?: number,
    nonce?: number,
    value?: BigNumber
  }

  export class Contract {
    address: string
    events: {
      [a: string]: () => void
    }
    connect: (a: Wallet) => Contract

    constructor (address: string, abi: Array<any>, wallet: Wallet)

    addListener (
      eventName: string,
      callback: EventCallback,
      transactionHash?: string
    ): void

    callConstant (functionName: string, args: Array<any>): Promise<any>

    callEstimate (functionName: string, args: Array<any>): Promise<BigNumber>

    callTransaction (
      functionName: string,
      args: Array<any>,
      options: TransactionOptions
    ): Promise<Transaction>

    createTransactionData (functionName: string, args: Array<any>): string

    removeListener (
      eventName: string,
      callback: EventCallback,
      transactionHash?: string
    ): void
  }
}
declare module '@colony/colony-js-adapter-ethers'

declare module '@colony/colony-js-contract-client' {
  import BigNumber from 'bn.js'

  import { Transaction, TransactionOptions, TransactionReceipt } from '@colony/colony-js-adapter'

  export type ParamTypes =
    | 'address'
    | 'bigNumber'
    | 'boolean'
    | 'date'
    | 'ipfsHash'
    | 'number'
    | 'string'

  export type Params = Array<any>
  export type EventParams = Array<any>

  export type ParamTypeDef = {
    validate: (value: any) => boolean,
    convertOutput: (value: any) => any,
    convertInput: (value: any) => any
  }

  export type SendOptions = {
    estimate: boolean,
    timeoutMs: number,
    waitForMining: boolean
  } & TransactionOptions

  export type ContractResponseMeta = {
    transaction: Transaction,
    receipt?: TransactionReceipt,
    receiptPromise?: Promise<TransactionReceipt>
  }

  export type ContractResponse<EventData> = {
    successful?: boolean,
    successfulPromise?: Promise<boolean>,
    eventData?: EventData,
    eventDataPromise?: Promise<EventData>,
    meta: ContractResponseMeta
  }

  export type ValidateEmpty = (
    outputValues: Object | null,
    inputValues: Object | null
  ) => Promise<boolean>

  export type ContractMethodArgs<IContractClient> = {
    client: IContractClient,
    functionName: string,
    name: string,
    input: Params,
    output?: Params,
    validateEmpty?: ValidateEmpty
  }

  export type ContractMethodSenderArgs<IContractClient> = {
    defaultGasLimit?: BigNumber,
    eventHandlers?: any
  } & ContractMethodArgs<IContractClient>

  export type GetRequiredSignees = (input: any) => Promise<Array<string>>

  export type ContractMethodMultisigSenderArgs<IContractClient> = {
    nonceFunctionName: string,
    nonceInput: Params,
    multisigFunctionName: string,
    getRequiredSignees: GetRequiredSignees
  } & ContractMethodSenderArgs<IContractClient>

  export type ContractMethodDef<IContractClient> = {
    client: IContractClient,
    functionName?: string,
    input: Params,
    output?: Params
  }

  export type Signature = {
    sigR: string,
    sigS: string,
    sigV: number
  }
}

declare module '@colony/colony-js-contract-loader-fs' {
  export class TruffleLoader {
    constructor (opts: { contractDir: string })
  }

  export class FSLoader {
    constructor (opts: { contractDir: string, transformer: any })
  }
}

declare module '@colony/colony-js-contract-loader-http' {
  export class HttpLoader {
    _endpoint: string

    constructor ({ transform, endpoint }: { transform: any, endpoint: string })
  }
}
declare module '@colony/colony-js-contract-loader'
